import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

export const renderLoading = (menu: React.ReactNode, isLoading: boolean) => {
  if (isLoading) {
    return (
      <p
        style={{
          padding: 30,
          color: "#999",
          textAlign: "center",
        }}
      >
        <SpinnerIcon spin /> Loading...
      </p>
    );
  }
  return menu;
};
