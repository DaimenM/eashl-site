export type Database = {
    public: {
      Tables: {
        accounts: {
          Row: {
            id: string;
            updated_at: string;
            username: string | null;
            full_name: string | null;
            avatar_url: string | null;
            email: string;
            leagues: string[]| null;
          };
          Insert: {
            id: string;
            updated_at?: string;
            username?: string | null;
            full_name?: string | null;
            avatar_url?: string | null;
            email: string;
          };
          Update: {
            id?: string;
            updated_at?: string;
            username?: string | null;
            full_name?: string | null;
            avatar_url?: string | null;
            email?: string;
          };
        };
      };
    };
  };