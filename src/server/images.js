import axios from 'axios'

const URL = "http://localhost:3030/"

export const uploadImage = async (formData) => {
    try {
        const result = await axios.post(URL + "upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return result.data
    } catch (err) {
        console.log(err)
    }
}

export const getImagesData = async () => {
    try {
        const result = await axios.get(URL + "get-images")
        return result.data
    } catch (err) {
        console.log(err)
    }
}

export const deleteImage = async (id, key) => {
    try {
        await axios.delete(URL + "delete-image", {
            data: { id, key }
        })
        return
    } catch (err) {
        console.log(err)
    }
}