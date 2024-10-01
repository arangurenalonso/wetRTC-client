export type PermissionsState = {
  localStream: MediaStream | null;
  loading: boolean;
};

export const permissionsInitialState: PermissionsState = {
  localStream: null,
  loading: false,
};
