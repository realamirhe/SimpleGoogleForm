const getTime = () => new Date()

const deltaTime = (s, e) => (e - s) / 1000

const toMin = deltaTime => deltaTime / 1000 / 60

const timer = () => {
  const startTime = getTime()
  return () => toMin(deltaTime(startTime, getTime()))
}

export default timer
