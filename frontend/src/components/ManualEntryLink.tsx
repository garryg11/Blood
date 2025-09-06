import { Link } from 'react-router-dom';

const ManualEntryLink = () => {
  return (
    <div className="text-center mt-8">
      <Link
        to="/manual"
        className="link focus:outline-auto"
        tabIndex={4}
        aria-label="Enter values manually"
        data-testid="manual-entry-link"
      >
        Enter values manually
      </Link>
    </div>
  );
};

export default ManualEntryLink;