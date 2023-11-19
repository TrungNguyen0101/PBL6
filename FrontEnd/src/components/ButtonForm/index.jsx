import '../../styles/ButtonForm.scss';

const ButtonForm = ({ children, props }) => {
  return (
    <button className="mx-auto button-form" {...props}>
      {children}
      <svg>
        <defs>
          <filter id="glow">
            <fegaussianblur result="coloredBlur" stdDeviation="5" />
            <femerge>
              <femergenode in="coloredBlur"></femergenode>
              <femergenode in="coloredBlur"></femergenode>
              <femergenode in="coloredBlur"></femergenode>
              <femergenode in="SourceGraphic"></femergenode>
            </femerge>
          </filter>
        </defs>
        <rect />
      </svg>
    </button>
  );
};

export default ButtonForm;
