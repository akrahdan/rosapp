import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { App } from "./containers/AppSwitch"


export const RemoteApp = () => (

  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)
