import React from 'react'
// component
import Typography from '@material-ui/core/Typography'
// assets
import images from '../../assets/images/404page.jpeg'

const PageNotFound = () => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <div>
        <Typography
          style={{
            position: 'absolute',
            fontSize: '8rem',
            zIndex: 1,
          }}
        >
          404 Not Found
        </Typography>
      </div>
      <img
        src={images}
        alt="404"
        style={{
          width: '100%',
          height: '100%',
          filter: 'blur(5px)',
          objectFit: 'cover',
        }}
      />
    </div>
  )
}

export default PageNotFound
