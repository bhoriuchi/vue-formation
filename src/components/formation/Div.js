import { makeTemplateBindings, extendMethods, dash as _ } from './common/index'
import { FRAMEWORKS, BOOTSTRAP } from './common/constants'

export default function Div (binding, framework) {
  let template = `<div ${makeTemplateBindings(binding)}>
  <component v-for="c in components"
    :is="kebab('formation-' + c.type)"
    :config="c.config"
    :components='c.components'
    :bindings="bindings"
    :framework="framework"
    :value.sync="value"></component>
</div>`

  return {
    template,
    name: 'formation-div',
    props: {
      value: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return {} } },
      bindings: { type: Object, default () { return {} } },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator (value) {
          return _.includes(FRAMEWORKS, value)
        }
      }
    },
    created () {
      this.$registerFormationComponents(this, this.components, this.bindings, this.framework)
    },
    methods: extendMethods({})
  }
}