import Loader from 'react-loader-spinner'

const LoaderView = () => (
  <div className="no-data-content">
    <Loader type="TailSpin" size={70} color="#ffa500" />
  </div>
)

export default LoaderView
