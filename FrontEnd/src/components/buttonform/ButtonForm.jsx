import '../../styles/ButtonForm.css';

const ButtonForm = ({ children }) => {
  return (
    <button class="button-form">
      {children}
      <svg>
        <defs>
          <filter id="glow">
            <fegaussianblur
              result="coloredBlur"
              stddeviation="5"
            ></fegaussianblur>
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
