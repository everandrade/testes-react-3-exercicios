/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from "@testing-library/react"
import Pokecard from "../components/Pokecard"
import axios from "axios"
import { pokecardMock } from "./pokecardMock"
import userEvent from "@testing-library/user-event"

jest.mock("axios")

const urlMock = {
    url: "https://pokeapi.co/api/v2/pokemon/2/"
}

const openModalMock = jest.fn()

const axiosResponseMock = {
    data: pokecardMock
}

describe("pokecard", () => {
    test("testar o render", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<Pokecard url={urlMock} openModalMock={openModalMock} />)
        screen.debug()

        await waitFor(() => { })
        screen.debug()
    })

    test("renderiza inicialmente o loading", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<Pokecard url={urlMock} openModalMock={openModalMock} />)
        // screen.logTestingPlaygroundURL()

        const loading = screen.getByText(/loading\.\.\./i)

        expect(loading).toBeInTheDocument()
        expect(screen.queryByText(/ivysaur/i)).not.toBeInTheDocument()

        await waitFor(() => { })
        // screen.logTestingPlaygroundURL()
    })

    test("renderiza o card corretamente após loading", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<Pokecard url={urlMock} openModalMock={openModalMock} />)

        await waitFor(() => {
            const namePoke = screen.getByRole("heading", { name: /ivysaur/i })
            const imgPoke = screen.getByRole("img", { name: /ivysaur/i })
            const typePoke = screen.getByText(/grass/i)
            const typePoke2 = screen.getByText(/poison/i)

            expect(namePoke).toBeInTheDocument()
            expect(imgPoke).toBeInTheDocument()
            expect(typePoke).toBeInTheDocument()
            expect(typePoke2).toBeInTheDocument()
        })
        // screen.logTestingPlaygroundURL()
    })

    test("abrir modal", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<Pokecard url={urlMock} openModal={openModalMock} />)

        const user = userEvent.setup()
        await waitFor(() => { })
        await user.click(screen.getByRole("article"))

        expect(openModalMock).toBeCalledTimes(1)
        expect(openModalMock).toReturn()
    })
})