<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-for="tab in config.tabs | canShow"
        :class="{ 'active': tab.id === active }">
        <a @click="activate(tab.id)">
          {{ tab.text || tab.id }}
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane"
        v-for="tab in config.tabs | canShow"
        :class="{ 'active': tab.id === active }">
        <slot :name="tab.id"></slot>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import * as _ from '../utils/utils'

  export default {
    methods: {
      activate (id) {
        this.$emit('show.bs.tab', id)
        if (this.active !== id) this.active = id
        this.$nextTick(() => {
          this.$emit('shown.bs.tab', id)
          if (typeof this.config.onActivate === 'function') this.config.onActivate(id, this)
        })
      }
    },
    created () {
      if (!this.active) this.active = _.get(this.config, 'tabs[0].id')
    },
    filters: {
      canShow (value) {
        return _.filter(value, (v) => v.show !== false)
      }
    },
    props: {
      active: {
        twoWay: true,
        type: String
      },
      config: {
        type: Object,
        required: true
      }
    }
  }
</script>
