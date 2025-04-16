   const bypassList = ['share@quotekong.com'];
    const buttonData = (
      <div className="flex gap-4 mb-4">
        <Button
          variant="default"
          className="bg-green-600 text-black"
          onClick={() => {
            // When button is clicked, the estimate details page opens in a new tab
            window.open("/estimate-line-details", "_blank");
          }}
        >
          Details
        </Button>
      </div>
    );

 const totalSections = EstimateData.reduce(
    (count: number[], item: EstimateQuestion) => {
      if (!count.includes(item.EstimateLineID)) {
        count.push(item.EstimateLineID);
      }
      return count;
    },
    []
  ).length;

  const allEstimateLines = EstimateData.reduce(
    (result: EstimateQuestion[], item: EstimateQuestion) => {
      const existingItem = result.find(
        (i) => i.EstimateLineID === item.EstimateLineID
      );
      if (
        !existingItem ||
        item.EstimateQuestionTypeSortOrder <
          existingItem.EstimateQuestionTypeSortOrder
      ) {
        const newItem: EstimateQuestion = {
          EstimateLineID: item.EstimateLineID,
          EstimateQuestionID: item.EstimateQuestionID,
          EstimateQuestionFull: item.EstimateQuestionFull,
          EstimateQuestionTypeName: item.EstimateQuestionTypeName,
          EstimateQuestionTypeSortOrder: item.EstimateQuestionTypeSortOrder,
        };
        if (existingItem) {
          result.splice(result.indexOf(existingItem), 1, newItem);
        } else {
          result.push(newItem);
        }
      }
      return result;
    },
    []
  );