import CarPlan from "./CarPlan";

const CarPlanLoggedOut = () => {
  return (
    <div>
      <h1>Car Plan</h1>
      <p>You need to be logged in to view your car plan.</p>
      <a href="/login">Login</a>
      <CarPlan isAuthorized={false}  />
    </div>
  );
}
export default CarPlanLoggedOut;