/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from "../interfaces/post";
import api, { DEBUG_MODE } from "./api";

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get('/appevento/posts');
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
     // console.error('Erro ao buscar posts:', error);
    }
    throw error;
  }
};

export const createPost = async (newPost: FormData): Promise<Post> => {
  try {
    const response = await api.post('/appevento/posts', newPost, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
     console.error('Erro ao criar post:', error);
    if (DEBUG_MODE) {
    }
    throw error;
  }
};
export const fetchPostsByParticipantEmail = async (email: string): Promise<Post[]> => {
  try {
    const response = await api.get('/appevento/posts/participant', {
      params: { email },
    });
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao buscar posts por e-mail:", error);
    }
    throw error;
  }
};
export const updatePost = async (idPost: number, idParticipant: number, formData: FormData): Promise<Post> => {
  try {
    const response = await api.patch(`/appevento/posts/${idPost}/${idParticipant}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    throw error;
  }
};
export const deletePost = async (id: number): Promise<void> => {
  try {
    await api.delete(`/appevento/posts/${id}`);
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    if (DEBUG_MODE) {
    }
    throw error;
  }
};