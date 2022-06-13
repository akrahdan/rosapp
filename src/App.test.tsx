import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { RemoteApp } from "./RemoteApp"

test("renders learn react link", () => {
  render(<RemoteApp />)
  const linkElement = screen.getByText(/learn chakra/i)
  expect(linkElement).toBeInTheDocument()
})
