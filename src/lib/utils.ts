export async function read(file: File) {
    const reader = new FileReader()
    return await new Promise(res => {
        reader.onload = e => {
            res(e.target?.result as string)
        }
        reader.readAsDataURL(file)
    }) as string
}
