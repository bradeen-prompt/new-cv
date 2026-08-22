-- Création de la table des crédits utilisateur
CREATE TABLE IF NOT EXISTS user_credits (
  user_id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  credits INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activation de la sécurité au niveau des lignes (RLS)
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- Politique : chaque utilisateur ne peut lire que ses propres crédits
CREATE POLICY "Users can view their own credits" 
  ON user_credits FOR SELECT 
  USING (auth.uid() = user_id);

-- Fonction RPC pour débiter un crédit de façon sécurisée (côté serveur)
CREATE OR REPLACE FUNCTION consume_credit()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INT;
BEGIN
  -- Vérifier le solde de l'utilisateur actuel
  SELECT credits INTO current_credits FROM user_credits WHERE user_id = auth.uid();
  
  IF current_credits > 0 THEN
    UPDATE user_credits 
    SET credits = credits - 1, updated_at = NOW() 
    WHERE user_id = auth.uid();
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- Table d'historique des achats
CREATE TABLE IF NOT EXISTS purchase_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  pack_id TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  credits_added INTEGER NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS pour l'historique d'achat
ALTER TABLE purchase_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchase history" 
  ON purchase_history FOR SELECT 
  USING (auth.uid() = user_id);

-- IMPORTANT : Activer l'authentification anonyme dans les paramètres de votre projet Supabase !
