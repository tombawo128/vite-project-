function Navigation({ pages, currentPage, onNavigate }) {
  return (
    <nav aria-label="Main navigation">
      {pages.map((page) => (
        <button
          key={page}
          className={currentPage === page ? 'selected' : ''}
          onClick={() => onNavigate(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  )
}

export default Navigation
