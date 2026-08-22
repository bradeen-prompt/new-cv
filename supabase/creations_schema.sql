-- Table de l'historique complet des projets/créations
CREATE TABLE IF NOT EXISTS creations_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  
  -- Paramètres initiaux du projet
  niche TEXT,
  video_title TEXT,
  video_description TEXT,
  mandatory_elements TEXT,
  emotion TEXT,
  theme TEXT,
  lighting TEXT,
  colors TEXT,
  style TEXT,
  format TEXT,
  
  -- Historiques dynamiques
  -- prompt_history contiendra un tableau d'objets : [{ "prompt": "...", "feedback": "...", "date": "..." }]
  prompt_history JSONB DEFAULT '[]'::jsonb,
  
  -- image_versions contiendra un tableau d'URLs : [{ "url": "...", "date": "..." }]
  image_versions JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Sécurité)
ALTER TABLE creations_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own creations history" 
  ON creations_history FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own creations history" 
  ON creations_history FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own creations history" 
  ON creations_history FOR UPDATE 
  USING (auth.uid() = user_id);
