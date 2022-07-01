import type { App } from 'vue'
import Icon from './icon'
import Overlay from './overlay'
import Loading from './loading'
import Button from './button'
import Row from './row'
import Col from './col'
import Space from './space'
import Divider from './divider'
import Input from './input'
import Form from './form'

const components = [
  Icon,
  Overlay,
  Loading,
  Button,
  Input,
  Row,
  Col,
  Space,
  Divider,
  Form,
]

export default {
  install(app: App) {
    components.map((c) => {
      app.use(c)
    })
  }
}