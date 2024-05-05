const getMetaInfo = (chartData: any) => {
  if (!chartData) return "";

  if (chartData["Information"]) return "";

  return (
    chartData["Meta Data"]["2. Symbol"] +
    " - " +
    chartData["Meta Data"]["1. Information"]
  );
};

export default getMetaInfo;