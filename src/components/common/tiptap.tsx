import { Button } from '@/components/ui/button'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Heading from '@tiptap/extension-heading'
import { Image } from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BoldIcon, Heading2, ImageIcon, LinkIcon, List } from 'lucide-react'
import { useCallback } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
}

export const Tiptap = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({
        levels: [2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Placeholder.configure({
        placeholder: 'هر چی راجب محصولت میدونی',
      }),
      Image.configure({
        HTMLAttributes: {
          class:
            'relative aspect-[4/3] overflow-hidden rounded-xl object-cover my-3 mx-auto',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run()
  }, [editor])

  const toggleHeading = useCallback(() => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run()
  }, [editor])

  const toggleList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run()
  }, [editor])

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  return (
    <div className="grid rounded-lg border bg-card">
      <div className="sticky top-0 z-10 flex items-center gap-2 rounded-t-[inherit] border-b bg-card p-2">
        <Button
          type="button"
          className="size-8"
          onClick={toggleBold}
          variant={'ghost'}
          size={'icon'}
        >
          <BoldIcon />
        </Button>
        <Button
          type="button"
          className="size-8"
          onClick={addImage}
          variant={'ghost'}
          size={'icon'}
        >
          <ImageIcon />
        </Button>
        <Button
          type="button"
          className="size-8"
          onClick={toggleList}
          variant={'ghost'}
          size={'icon'}
        >
          <List />
        </Button>
        <Button
          type="button"
          className="size-8"
          onClick={toggleHeading}
          variant={'ghost'}
          size={'icon'}
        >
          <Heading2 />
        </Button>
        <Button
          type="button"
          className="size-8"
          onClick={setLink}
          variant={'ghost'}
          size={'icon'}
        >
          <LinkIcon />
        </Button>
      </div>
      <EditorContent editor={editor} className="text-editor" />
    </div>
  )
}
