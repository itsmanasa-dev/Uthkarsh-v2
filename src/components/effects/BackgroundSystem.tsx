export function BackgroundSystem() {
  return (
    <div className="bg-system" aria-hidden="true">
      <div className="bg-system__layer bg-system__layer--grid" />
      <div className="bg-system__layer bg-system__layer--particles" />
      <div className="bg-system__layer bg-system__layer--glow" />
      <div className="bg-system__layer bg-system__layer--scanlines" />
      <div className="bg-system__layer bg-system__layer--dots" />
      <div className="bg-system__layer bg-system__layer--gradient-mesh" />
      <div className="bg-system__layer bg-system__layer--circuits" />
      <div className="bg-system__layer bg-system__layer--noise" />
    </div>
  )
}
