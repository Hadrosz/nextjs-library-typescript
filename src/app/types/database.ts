export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Author: {
        Row: {
          bornDate: string | null
          deathDate: string | null
          fullName: string
          id: number
          nationality: number
        }
        Insert: {
          bornDate?: string | null
          deathDate?: string | null
          fullName?: string
          id?: number
          nationality: number
        }
        Update: {
          bornDate?: string | null
          deathDate?: string | null
          fullName?: string
          id?: number
          nationality?: number
        }
        Relationships: [
          {
            foreignKeyName: "Author_nationality_fkey"
            columns: ["nationality"]
            isOneToOne: false
            referencedRelation: "Country"
            referencedColumns: ["id"]
          }
        ]
      }
      AuthorsBooks: {
        Row: {
          authorID: number
          bookID: string
        }
        Insert: {
          authorID: number
          bookID: string
        }
        Update: {
          authorID?: number
          bookID?: string
        }
        Relationships: [
          {
            foreignKeyName: "AuthorsBooks_authorID_fkey"
            columns: ["authorID"]
            isOneToOne: false
            referencedRelation: "Author"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "AuthorsBooks_bookID_fkey"
            columns: ["bookID"]
            isOneToOne: false
            referencedRelation: "Books"
            referencedColumns: ["id"]
          }
        ]
      }
      Books: {
        Row: {
          dateWritten: string
          description: string
          id: string
          image_url: string
          link_book: string
          price: number | null
          series: string | null
          title: string
        }
        Insert: {
          dateWritten: string
          description: string
          id?: string
          image_url?: string
          link_book?: string
          price?: number | null
          series?: string | null
          title: string
        }
        Update: {
          dateWritten?: string
          description?: string
          id?: string
          image_url?: string
          link_book?: string
          price?: number | null
          series?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Books_series_fkey"
            columns: ["series"]
            isOneToOne: false
            referencedRelation: "Series"
            referencedColumns: ["id"]
          }
        ]
      }
      BooksGenre: {
        Row: {
          bookID: string
          genreID: number
        }
        Insert: {
          bookID: string
          genreID: number
        }
        Update: {
          bookID?: string
          genreID?: number
        }
        Relationships: [
          {
            foreignKeyName: "BooksGenre_bookID_fkey"
            columns: ["bookID"]
            isOneToOne: false
            referencedRelation: "Books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BooksGenre_genreID_fkey"
            columns: ["genreID"]
            isOneToOne: false
            referencedRelation: "Genres"
            referencedColumns: ["id"]
          }
        ]
      }
      Country: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      Genres: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      Series: {
        Row: {
          id: string
          Name: string
        }
        Insert: {
          id?: string
          Name?: string
        }
        Update: {
          id?: string
          Name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
