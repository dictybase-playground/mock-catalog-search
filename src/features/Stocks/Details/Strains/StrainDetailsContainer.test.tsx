import React from "react"
import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import StrainDetailsContainer from "./StrainDetailsContainer"
import { CartProvider } from "features/ShoppingCart/CartStore"
import { StrainDocument } from "dicty-graphql-schema"
import { strainWithPhenotype } from "mocks/mockStrain"

const mockID = "DBS0350966"

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")

  return {
    ...originalModule,
    useParams: () => ({
      id: mockID,
    }),
  }
})

describe("features/Stocks/Strains/StrainDetailsContainer", () => {
  describe("initial render", () => {
    const mocks = [
      {
        request: {
          query: StrainDocument,
          variables: { id: mockID },
        },
        result: {
          data: {
            strain: strainWithPhenotype,
          },
        },
      },
    ]

    const MockComponent = ({ mocks }: any) => {
      return (
        <MockedProvider mocks={mocks} addTypename={false}>
          <CartProvider>
            <BrowserRouter>
              <StrainDetailsContainer />
            </BrowserRouter>
          </CartProvider>
        </MockedProvider>
      )
    }

    it("displays expected data", async () => {
      render(<MockComponent mocks={mocks} />)
      // displays loading skeleton first
      expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
      // wait for data to load...
      const strain = await screen.findByRole("heading", {
        name: strainWithPhenotype.label,
      })
      expect(strain).toBeInTheDocument()
      // shows depositor
      const { depositor } = strainWithPhenotype
      expect(
        screen.getByText(`${depositor.first_name} ${depositor.last_name}`),
      ).toBeInTheDocument()
    })
  })
})
