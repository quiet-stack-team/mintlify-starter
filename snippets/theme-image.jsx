// snippets/theme-image.jsx

export const ThemeImage = ({img_name, alt, width, height}) => {
    return (
        <>
            <img width={width} height={height} src={`/images/light/${img_name}`} alt={alt}
                 className="block dark:hidden"/>
            <img width={width} height={height} src={`/images/dark/${img_name}`} alt={alt}
                 className="hidden dark:block"/>
        </>
    )
}