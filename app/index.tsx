import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, Text, View } from "react-native";
import "../global.css";
import { Build, QuestData, QuestParts, Variant, WeaponWithoutTask } from './types/types';
import { fetchQuestPart } from './utils/questPart';
import { fetchQuestPartsList } from './utils/questPartsList';

export default function Index() {
  const [data, setData] = useState<QuestParts | undefined>(undefined);
  const [partData, setPartData] = useState<QuestData | undefined>(undefined);

  const [questPartIndex, setQuestPartIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartsList = async () => {
      try {
        const response = await fetchQuestPartsList();

        setData(response);
      } catch (error) {
        console.error('Axios error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartsList();
  }, []);

  useEffect(() => {
    if (questPartIndex < 0 || !data) return;

    const fetchPart = async () => {
      setLoading(true);
      try {
        const response = await fetchQuestPart(data.parts[questPartIndex]);
        setPartData(response);
      } catch (error) {
        console.error('Axios error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [questPartIndex, data]);

  if (loading) return <ActivityIndicator />;

  const handlePrev = () => {
    setQuestPartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!data) return;
    setQuestPartIndex((prev) => Math.min(data.parts.length - 1, prev + 1));
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            gap: "0.5rem",
          }}
        >
          <Button onPress={handlePrev} title='Back' disabled={questPartIndex === 0}></Button>
          <Button onPress={handleNext} title='Next' disabled={questPartIndex === (data?.parts.length ?? 1) - 1}></Button>
        </View>

        {data && data.parts && (
          <Text style={{ 
            fontSize: 32,
            flex: 1,
          }}>
            Part {data.parts[questPartIndex]}
          </Text>
        )}

        {partData && partData.builds.map((build: Build, partDataIndex: number) =>
          <View key={partDataIndex}>
            <Text>{build.weapon?.name || 'No name'}</Text>
            <View
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: "flex-start",
                marginLeft: 16,
              }}
            >
              <Text style={{ fontSize: 32 }}>Variants:</Text>

              {build.variants.map((variant: Variant, variantIndex: number) => (
                <View key={variantIndex}>
                  {variant.parts.map((part: {items: WeaponWithoutTask[]}, partIndex: number) => (
                    <View key={partIndex}>
                      {part.items.map((partItem: WeaponWithoutTask, partItemIndex: number) => (
                        <Text style={{ fontSize: 32 }} key={partItemIndex}>
                          {partItem.name || 'No Name'}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}

      </View>
    </ScrollView>
  );
}
