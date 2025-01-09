import { Label } from '@/components/ui/label'
import { type Tag, TagInput } from 'emblor'
import React from 'react'

export const AddProductTags = () => {
  const [tags, setTags] = React.useState<Tag[]>([])
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null
  )

  return (
    <div className="grid gap-2">
      <Label>Tags</Label>
      <TagInput
        placeholder="Enter a topic"
        tags={tags}
        setTags={(newTags) => {
          setTags(newTags)
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
      />
    </div>
  )
}
