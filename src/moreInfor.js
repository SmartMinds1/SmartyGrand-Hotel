import Button from "./Button";

const MoreInfor = ({ reqType, setReqType }) => {
  return (
    <>
      <Button buttonText="More" reqType={reqType} setReqType={setReqType} />
      <br />
      <Button buttonText="Contacts" reqType={reqType} setReqType={setReqType} />
    </>
  );
};

export default MoreInfor;
