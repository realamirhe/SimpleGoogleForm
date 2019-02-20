const saveToDisk = () => {
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'

  return (blob, fileName) => {
    const url = window.URL.createObjectURL(blob)

    a.href = url
    a.download = fileName
    a.click()

    window.URL.revokeObjectURL(url)
  }
}

export const saveBlobToDisk = saveToDisk()
