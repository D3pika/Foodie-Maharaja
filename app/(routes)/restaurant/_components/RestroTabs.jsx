import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSection from './MenuSection';
import ReviewSection from './ReviewSection';
import AboutSection from './AboutSection';

function RestroTabs({ restaurant }) {
  return (
    <Tabs defaultValue="category" className="w-full mt-10">
      <TabsList>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="review">Reviews</TabsTrigger>
      </TabsList>

      {/* <TabsContent value="about"><AboutSection restaurant={restaurant} /></TabsContent> */}
      <TabsContent value="category"><MenuSection restaurant={restaurant} /></TabsContent>
      <TabsContent value="review"><ReviewSection restaurant={restaurant} /></TabsContent>
    </Tabs>
  );
}

export default RestroTabs;