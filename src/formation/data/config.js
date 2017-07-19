export default {
  fModel: {
    text1: 'Hi Mom!'
  },
  fConfig: {
    components: [
      {
        type: 'form-grid',
        config: {
          rows: [
            {
              columns: [
                {
                  label: 'Text2',
                  type: 'text-input',
                  config: {
                    model: 'text2'
                  }
                },
                {
                  label: 'Text3',
                  type: 'text-input',
                  config: {
                    model: 'text3'
                  }
                }
              ]
            }
          ]
        }
      },
      {
        type: 'text-input',
        config: {
          model: 'text1'
        }
      },
      {
        type: 'button',
        config: {
          type: 'primary',
          text: 'click me'
        }
      },
      {
        type: 'div',
        components: [
          {
            type: 'button',
            config: {
              type: 'danger',
              text: 'stuff'
            }
          }
        ]
      },
      {
        type: 'container',
        components: [
          {
            type: 'div',
            components: [
              {
                type: 'container',
                components: [
                  {
                    type: 'button',
                    config: {
                      type: 'danger',
                      text: 'DEEP'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
