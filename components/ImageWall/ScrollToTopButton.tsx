export default function ScrollToTopButton() {
  return (
    <div className="w-full flex justify-center">
      <button
        className="rounded w-28 border-red-500 border-2 p-1 my-2"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }}
      >
        Go to Top
      </button>
    </div>
  )
}
