const SubmitButton = ({ name }) => {
  return (
    <button
      type="submit"
      className="cursor-pointer p-4 bg-blue-950 hover:bg-blue-200 text-2xl text-white hover:text-blue-950 rounded-2xl"
    >
      {name}
    </button>
  );
};

export default SubmitButton;
