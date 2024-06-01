import logo from "../assets/react.svg"

export default function ProductImg({width, height, filename, className}) {

    //console.log(import.meta.env.VITE_FILES_URL)

    return (
        <img src={import.meta.env.VITE_FILES_URL + filename}
                alt={logo}
                width={width}
                height={height}
                className={className}
            />
    )
}