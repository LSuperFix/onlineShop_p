import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={450}
    viewBox="0 0 280 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="115" r="115" /> 
    <rect x="0" y="243" rx="0" ry="0" width="280" height="21" /> 
    <rect x="-1" y="284" rx="0" ry="0" width="280" height="56" /> 
    <rect x="2" y="361" rx="10" ry="10" width="97" height="33" /> 
    <rect x="136" y="359" rx="20" ry="20" width="140" height="40" />
  </ContentLoader>
)

export default Skeleton