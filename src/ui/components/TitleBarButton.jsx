const TitleBarButton = ({ onClick, icon }) => {
  return (
    <button onClick={onClick} className="cursor-pointer">
      {icon}
    </button>
  );
};

export default TitleBarButton;
