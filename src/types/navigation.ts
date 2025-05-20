export type RootStackParamList = {
  Home: undefined;
  BookList: undefined;
  NoteList: { bookId: number; bookTitle: string };
  NoteDetail: { noteId: number; bookId: number };
  CameraScreen: { bookId?: number };
};
