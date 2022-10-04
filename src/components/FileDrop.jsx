import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function FileDrop({images, setImages}) {

  const onDrop = useCallback(acceptedFiles => {
    setImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
            preview: URL.createObjectURL(file),
        })
      )
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    useFsAccessApi: false,
      accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpeg', '.jpg'],
      },
      onDrop: onDrop
    });

  return (
    <div {...getRootProps()} className="text-slate-500 cursor-pointer mt-[16rem] mb-[12rem] border-dashed border-2 border-slate-400 py-[8rem] px-[12rem]">
      <input {...getInputProps()} />{isDragActive ?
          <p>Drop the image or images here ...</p> :
          <p>Drag 'n' drop some image files here, or click to select files</p>}
    </div>
  )
}

