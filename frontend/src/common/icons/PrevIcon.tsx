const PreviousIcon = () => {
  return (
    <div className="h-10 w-10 ml-1 flex justify-center items-center rounded-full cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-right w-6 h-6"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </div>
  );
};
export default PreviousIcon;
