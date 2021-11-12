import { useEffect, useState } from "react";
import { deleteImage, getImagesData, uploadImage } from "./server/images";

function App() {
  const [images, setImgaes] = useState([])
  //const URL = "https://nim-photos-storage.s3.eu-west-1.amazonaws.com/"
  const URL = "http://localhost:3030/get-image"

  const onSubmitForm = (e) => {
    e.preventDefault()
    const image = e.target.children[0].files[0];
    const formData = new FormData()
    formData.append("image", image)

    uploadImage(formData)
      .then(res => {
        console.log(res)
        return getImagesData()
      })
      .then(newImages => {
        setImgaes(newImages)
      })
  }

  const onClickDelete = (id, key) => {
    deleteImage(id, key)
      .then(() => {
        return getImagesData()
      })
      .then(newImages => {
        setImgaes(newImages)
      })
  }


  useEffect(() => {
    getImagesData()
      .then((newImages) => {
        setImgaes(newImages)

      })
  }, [])
  return (
    <div >
      <h1>Images app</h1>
      <form onSubmit={onSubmitForm}>
        <input type="file" name="image" />
        <button type="submit">Submit</button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
        {
          images.map((image) => (
            <div key={image._id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h3>{image.originalName || "default name"}</h3>
              <img
                style={{ width: 250, height: 250 }}
                src={URL + `?key=${image.key}&name=${image.originalName}`}
                alt={image.originalName} />
              <button onClick={() => {
                onClickDelete(image._id, image.key)
              }}>
                Delete {image.originalName}
              </button>
              <hr style={{
                border: 0, display: "block", width: "50vw", backgroundColor: "black", height: "0.5px"
              }} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
