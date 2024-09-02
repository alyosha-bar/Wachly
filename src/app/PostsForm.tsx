"use client"

import { useFormState } from "react-dom"
import { useFormStatus } from "react-dom";
import createPost  from "@/app/actions"

const initialState = {
    message: "",
}

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <button type="submit" aria-disabled={pending}>
        Add
      </button>
    );
  }

  export function PostsForm() {
    // const [state, formAction] = useFormState(createPost, initialState);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            userId: Number(formData.get('user_id')),
        };
        await createPost(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="content" placeholder="Content" />
            <input type="text" name="user_id" placeholder="User Id" />
            <SubmitButton />
        </form>
    );

}