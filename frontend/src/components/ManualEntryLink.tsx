import { Link } from 'react-router-dom';

const ManualEntryLink = () => {
  return (
    <div className="text-center mt-8">
      <Link
        to="/manual"
        className="text-[#007aff] text-lg font-medium hover:text-[#0056b3] transition-colors duration-200 focus:outline-auto"
        tabIndex={5}
        aria-label="Enter values manually"
        data-testid="manual-entry-link"
      >
        Enter values manually
      </Link>
    </div>
  );
};

export default ManualEntryLink;