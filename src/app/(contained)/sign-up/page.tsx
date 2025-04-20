import { UserSignUpForm } from "@/components/user-signup-form/user-signup-form";

export default function SignUpArea() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex-shrink-0">
        <UserSignUpForm />
      </div>
    </div>
  );
}
