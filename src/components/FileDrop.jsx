import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function FileDrop({image, setImage}) {

  const onDrop = useCallback(acceptedFiles => {
      setImage(
        acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        )
      );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
      accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpeg', '.jpg'],
      },
      onDrop: onDrop
    });

  return (
    <div {...getRootProps()}>
      {image.length > 0 ?
        image.map((i) => <img src={i.preview} alt="" />) :
        null
      }
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

