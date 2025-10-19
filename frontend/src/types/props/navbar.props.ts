import type { UserData } from '../user.types'
import type { LogoConfig } from '../logo.types'
import type { MenuItem } from '../menu.types'
import type { AuthConfig } from '../auth.types'

export interface NavbarProps {
  isAuthenticated?: boolean
  user?: UserData
  logo?: LogoConfig
  menu?: MenuItem[]
  auth?: AuthConfig
  onLogout?: () => void
}

export interface UserDropdownMenuProps {
  user: UserData | null | undefined
  menuItems: MenuItem[]
  isLoggingOut: boolean
  logoutError: string[]
}

export interface MobileNavMenuProps {
  logo: LogoConfig
  menu: MenuItem[]
  user: UserData | null | undefined
  isAuthenticated: boolean
  userMenuItems: MenuItem[]
  auth: AuthConfig
  isLoggingOut: boolean
  logoutError: string[]
}

export interface UserAvatarProps {
  user: UserData | null | undefined
  size?: 'sm' | 'md' | 'lg'
}

export interface AuthButtonsProps {
  auth: AuthConfig
  variant?: 'desktop' | 'mobile'
}
