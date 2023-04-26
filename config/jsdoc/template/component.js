const reactDocs = require('react-docgen')
const vueDocs = require('vue-docgen-api')
const fs = require('fs')
const path = require('path')

exports.handlers = {
  beforeParse(e) {
    if (path.extname(e.filename) === '.vue') {
      e.componentInfo = vueDocs.parse(e.filename)
      const script = e.source.match(new RegExp('<script>(.*?)</script>', 's'))
      e.source = script[1]
    }
  },

  newDoclet({ doclet }) {
    const filePath = path.join(doclet.meta.path, doclet.meta.filename)
    const componentTag = (doclet.tags || []).find((tag) => tag.title === 'component')
    if (componentTag) {
      if (path.extname(filePath) === '.vue') {
        doclet.component = parseVue(filePath, doclet)
        doclet.component.type = 'vue'
      } else {
        doclet.component = parseReact(filePath, doclet)
        doclet.component.type = 'react'
      }
      doclet.kind = 'class'
    } else {
      if (path.extname(filePath) === '.vue') {
        const docGen = vueDocs.parse(filePath)
        const name = docGen.displayName
        if (doclet.kind === 'function' || doclet.kind === 'event') {
          doclet.memberof = name
        } else {
          doclet.undocumented = true
        }
      }

      if (path.extname(filePath) === '.jsx') {
        if (doclet.kind !== 'function' && doclet.kind !== 'event') {
          doclet.undocumented = true
        }
      }
    }
  },
}

var parseReact = function (filePath, doclet) {
  if (path.extname(filePath) === '.tsx') {
    return {
      props: [],
      displayName: doclet.name,
      filePath,
    }
  }
  const src = fs.readFileSync(filePath, 'UTF-8')
  let docGen
  try {
    docGen = reactDocs.parse(src)
  } catch (error) {
    if (error.message === 'No suitable component definition found.') {
      return {
        props: [],
        filePath,
        displayName: doclet.name,
      }
    }
    throw error
  }

  return {
    props: Object.entries(docGen.props || {}).map(([key, prop]) => ({
      name: key,
      description: prop.description,
      type: prop.type.name,
      required: typeof prop.required === 'boolean' && prop.required,
      defaultValue: prop.defaultValue
        ? (prop.defaultValue.computed ? 'function()' : prop.defaultValue.value)
        : undefined,
    })),
    displayName: docGen.displayName,
    filePath,
  }
}

var parseVue = function (filePath, doclet) {
  const docGen = vueDocs.parse(filePath)
  doclet.name = doclet.longname = docGen.displayName
  return {
    displayName: docGen.displayName,
    filePath,
    props: Object.values(docGen.props || {}).map((prop) => ({
      name: prop.name,
      description: prop.description,
      type: prop.type.name,
      required: typeof prop.required === 'boolean' && prop.required,
      defaultValue: prop.defaultValue
        ? (prop.defaultValue.func ? 'function()' : prop.defaultValue.value)
        : undefined,
    })),
    slots: Object.keys(docGen.slots || {}).map((key) => ({
      name: key,
      description: docGen.slots[key].description,
    })),
  }
}

exports.parseVue = parseVue
exports.parseReact = parseReact
