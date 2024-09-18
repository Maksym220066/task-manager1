import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                colors: {
                    primary: '#0e1b58',
                    darkPrimary: '#040528',
                    gray: 'rgb(189, 195, 199)',
                    green: 'rgb(92, 196, 101)',
                    orange: 'rgb(241, 196, 15)',
                    red: 'rgb(245,0,27)'
                }
            },
        },
    },
})

export default vuetify