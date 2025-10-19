import type { UserData } from './user.types'
import type { LogoConfig } from './logo.types'
import type { MenuItem } from './menu.types'
import type { AuthConfig } from './auth.types'

export interface NavbarProps {
  isAuthenticated?: boolean
  user?: UserData
  logo?: LogoConfig
  menu?: MenuItem[]
  auth?: AuthConfig
  onLogout?: () => void
}
